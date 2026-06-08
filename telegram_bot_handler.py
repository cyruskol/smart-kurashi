# telegram_bot_handler.py
# @kolnews_jp_bot handler for receiving news digest and forwarding to Telegram channel

import os
from flask import Flask, request, jsonify
import logging
import json
from datetime import datetime
import requests

# Initialize logger
logger = logging.getLogger(__name__)

# Load bot credentials from environment
BOT_TOKEN = os.getenv("BOT_TOKEN", "")
TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID", "-100xxxxxxxxxx")

# Initialize Flask app
app = Flask(__name__, static_folder='/static', static_url_path='')
TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID", "-100xxxxxxxxxx")

def is_valid_bot_signature(payload, secret_token=None):
    """Verify webhook signature if secret token configured."""
    if secret_token:
        # Implement HMAC verification here
        pass
    return True  # Assume valid for now - add proper validation in production


def send_telegram_message(content_dict, bot_token=BOT_TOKEN):
    """Send formatted news digest to Telegram channel."""
    
    try:
        # Apply formatting rules from config
        message = format_news_digest(content_dict)
        
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        
        payload = {
            "chat_id": TELEGRAM_CHANNEL_ID,
            "text": message,
            "parse_mode": "Markdown",  # Telegram supports MarkdownV2 now
            "disable_web_page_preview": True  # We format links ourselves
        }
        
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            
            log_entry = create_log_entry(
                action="message_sent",
                channel_id=result.get("result", {}).get("chat_id"),
                message_text=result.get("result", {}).get("text")[:100],
                parent_content_id=content_dict.get("id", "unknown")
            )
            
            logger.info(f"Message sent successfully: {log_entry}")
            return {"status": "ok", "log_id": log_entry}
        else:
            logger.error(f"Failed to send message: HTTP {response.status_code}")
            raise Exception(f"Telegram API error: {response.text}")
            
    except Exception as e:
        logger.error(f"Error in send_telegram_message: {e}")
        return {"status": "error", "error": str(e)}


def format_news_digest(content_dict):
    """Format news digest according to Smart Kurashi standards."""
    
    category_emoji = {
        "AI": "🤖 AI",
        "家電": "🏠 家電",
        "電子機器": "📱 電子機器",
        "IoT": "🔗 IoT",
        "ソフトウェア": "💻 ソフトウェア"
    }
    
    category = content_dict.get("category", "AI")
    emoji = category_emoji.get(category, "🤖 AI")
    
    title = content_dict.get("title", content_dict.get("content", ""))[:50]
    timestamp = content_dict.get("timestamp", datetime.utcnow().isoformat())
    sources = content_dict.get("sources", [])
    
    # Build message
    message_parts = []
    
    # Header with category badge
    message_parts.append(f"## {emoji} {title}")
    message_parts.append("")
    
    # Main content (first 2000 chars, Telegram has limits)
    content = content_dict.get("content", "")
    if len(content) > 2000:
        content = content[:1950] + "..."
    message_parts.append(content)
    message_parts.append("")
    
    # Sources section
    if sources:
        message_parts.append("**🔗 [出典](Sources)**:")
        for i, source in enumerate(sources[:3], 1):  # Show max 3 sources
            name = source.get("name", "Unknown")
            url = source.get("url", "#")
            message_parts.append(f"  {i}. {name}: <a href='{url}'>{url}</a>")
        message_parts.append("")
    
    # Timestamp footer
    jst_time = datetime.fromisoformat(timestamp.replace('Z', '+09:00')).strftime('%Y-%m-%d %H:%M')
    message_parts.append(f"*ℹ️ 投稿時刻：{jst_time}*")
    
    return "\n".join(message_parts)


def create_log_entry(action, channel_id=None, message_text=None, parent_content_id=None):
    """Create log entry for verification."""
    
    timestamp = datetime.utcnow().isoformat() + "+09:00"
    
    log_record = {
        "timestamp": timestamp,
        "action": action,
        "channel_id": str(channel_id) if channel_id else None,
        "message_text_preview": message_text[:100] if message_text else None,
        "parent_content_id": parent_content_id
    }
    
    # Log to file or external logging service
    with open(os.path.expanduser("~/.hermes/logs/telegram_bot.log"), "a") as f:
        log_json = json.dumps(log_record) + "\n"
        f.write(log_json)
    
    return log_record


# Flask route for webhook endpoint
@app.route('/api/telegram/webhook/new_digest', methods=['POST'])
def new_digest_handler():
    """Handle incoming news digest and forward to Telegram."""
    
    try:
        # Check if content is JSON or plain text command
        content_type = request.headers.get('Content-Type', '')
        
        if 'application/json' not in content_type:
            return jsonify({"error": "Expected JSON payload"}), 400
        
        payload = request.get_json()
        
        # Handle test commands
        if not payload and request.args.get('command') == 'test':
            test_payload = {
                "content": "## 🤖 テスト投稿\n\nこれは @kolnews_jp_bot のテストメッセージです。すべてのシステムが正しく動作しています。\n\nℹ️ 投稿時刻：テスト",
                "title": "Bot 検証 - テスト投稿",
                "category": "AI",
                "sources": [{"name": "Test Bot", "url": "https://example.com"}],
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        elif payload.get('type') == 'command':
            cmd = payload.get('command', '')
            if cmd == '/digest latest':
                # This would fetch from database/redis/etc in production
                return jsonify({"status": "scheduled", "message": "Digest scheduled"})
            else:
                return jsonify({"error": f"Unknown command: {cmd}"}), 400
        
        content_dict = payload
        
        # Verify content has required fields
        required_fields = ["content"]
        missing = [f for f in required_fields if f not in content_dict]
        if missing:
            return jsonify({"error": f"Missing required fields: {missing}"}), 400
        
        # Validate category
        valid_categories = ["AI", "家電", "電子機器", "IoT", "ソフトウェア"]
        if content_dict.get("category") not in valid_categories:
            return jsonify({"error": f"Invalid category. Must be one of: {', '.join(valid_categories)}"}), 400
        
        # Validate sources format
        sources = content_dict.get("sources", [])
        for i, source in enumerate(sources):
            if "url" not in source:
                return jsonify({"error": f"Source {i} missing 'url' field"}), 400
        
        # Send to Telegram
        result = send_telegram_message(content_dict)
        
        if result["status"] == "ok":
            return jsonify({
                "status": "success",
                "log_id": result.get("log_id"),
                "message": "News digest forwarded successfully"
            }), 200
        else:
            return jsonify({
                "status": "error",
                "error": result.get("error")
            }), 500
            
    except Exception as e:
        logger.exception(f"Error in new_digest_handler: {e}")
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5002)
