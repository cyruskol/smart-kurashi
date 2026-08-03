import json
import random
from datetime import datetime, timezone

# Read current state
with open('/Users/gengar_chan/smart-kurashi/scripts/.engine_state.json', 'r') as f:
    state = json.load(f)

# Generate new random target interval (115-210 minutes)
new_target = random.randint(115, 210)

# Update state
state['last_run_time'] = datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')
state['current_target_interval'] = new_target
state['last_topic'] = 'ai-tech'

# Write back
with open('/Users/gengar_chan/smart-kurashi/scripts/.engine_state.json', 'w') as f:
    json.dump(state, f, indent=2)

print(f"Updated .engine_state.json:")
print(json.dumps(state, indent=2))
