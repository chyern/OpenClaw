#!/usr/bin/env node
/**
 * scripts/config.js
 * 
 * Manages the workflow settings for the agent, particularly around security constraints
 * like the use of parallel sub-agents (which is restricted by default due to audit requirements).
 * 
 * Usage:
 *   node config.js get
 *   node config.js set useSubAgents true
 *   node config.js set maxSubAgents 2
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const CONFIG_FILE = resolve(process.env.HOME, '.openclaw/workspace/project/openclaw.json');
const SKILL_MD = resolve(dirname(import.meta.url).replace('file://', ''), '../SKILL.md');
const NAMESPACE = 'multi-step-workflow';

const DEFAULT_CONFIG = {
  useSubAgents: false,
  maxSubAgents: 3,
  always: false // This reflects the platform force-load state
};

function loadFullConfig() {
  if (!existsSync(CONFIG_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function getSkillConfig() {
  const data = loadFullConfig();
  const config = { ...DEFAULT_CONFIG, ...(data[NAMESPACE] || {}) };
  
  // Sync the 'always' value from SKILL.md if possible
  if (existsSync(SKILL_MD)) {
    const content = readFileSync(SKILL_MD, 'utf8');
    const match = content.match(/always:\s*(true|false)/);
    if (match) config.always = match[1] === 'true';
  }
  
  return config;
}

function saveSkillConfig(skillConfig) {
  // 1. Save to openclaw.json
  const data = loadFullConfig();
  data[NAMESPACE] = { ...skillConfig };
  delete data[NAMESPACE].always; // Don't redundantly store always in JSON if it's in SKILL.md
  
  mkdirSync(dirname(CONFIG_FILE), { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));

  // 2. Cross-file update: modify SKILL.md if 'always' is changed
  if (existsSync(SKILL_MD)) {
    let content = readFileSync(SKILL_MD, 'utf8');
    const newVal = skillConfig.always ? 'true' : 'false';
    const updated = content.replace(/(always:\s*)(true|false)/, `$1${newVal}`);
    if (content !== updated) {
      writeFileSync(SKILL_MD, updated);
      return true; // marked as modified SKILL.md
    }
  }
  return false;
}

const [cmd, key, value] = process.argv.slice(2);

if (cmd === 'get') {
  console.log(JSON.stringify(getSkillConfig(), null, 2));
} else if (cmd === 'set' && key && value) {
  const config = getSkillConfig();
  const wasAlways = config.always;
  
  if (key === 'always' || typeof DEFAULT_CONFIG[key] === 'boolean') {
    config[key] = value === 'true';
  } else if (typeof DEFAULT_CONFIG[key] === 'number') {
    config[key] = parseInt(value, 10);
  } else {
    config[key] = value;
  }
  
  const skillModified = saveSkillConfig(config);
  
  console.log(JSON.stringify({ 
    ok: true, 
    config_file: CONFIG_FILE, 
    platform_hook_modified: key === 'always' && skillModified,
    [NAMESPACE]: config 
  }, null, 2));
} else {
  console.log('Usage:');
  console.log('  node scripts/config.js get');
  console.log('  node scripts/config.js set <key> <value>');
}
