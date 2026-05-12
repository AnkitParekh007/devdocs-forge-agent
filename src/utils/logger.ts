// ANSI color codes — no chalk dependency needed
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

export const logger = {
  ok(label: string, detail = '') {
    const suffix = detail ? `  ${DIM}${detail}${RESET}` : '';
    console.log(`  ${GREEN}OK${RESET}   ${label}${suffix}`);
  },

  warn(label: string, detail = '') {
    const suffix = detail ? `  ${DIM}${detail}${RESET}` : '';
    console.log(`  ${YELLOW}WARN${RESET} ${label}${suffix}`);
  },

  fail(label: string, detail = '') {
    const suffix = detail ? `  ${DIM}${detail}${RESET}` : '';
    console.log(`  ${RED}FAIL${RESET} ${label}${suffix}`);
  },

  info(message: string) {
    console.log(`  ${CYAN}${message}${RESET}`);
  },

  section(title: string) {
    console.log('');
    console.log(`${BOLD}${title}${RESET}`);
    console.log('─'.repeat(Math.min(title.length + 2, 60)));
  },

  success(message: string) {
    console.log(`\n  ${GREEN}${BOLD}✓${RESET} ${message}`);
  },

  error(message: string) {
    console.error(`\n  ${RED}${BOLD}✗${RESET} ${message}`);
  },

  line() {
    console.log('');
  },

  dim(message: string) {
    console.log(`  ${DIM}${message}${RESET}`);
  },
};
