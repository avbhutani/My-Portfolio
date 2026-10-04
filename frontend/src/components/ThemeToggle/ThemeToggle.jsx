import { useTheme } from '../../hooks/useTheme';
import { IconMoon, IconSun } from '../icons/Icons';
import s from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={s.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {/* Shows the theme being switched TO, matching the accessible name. */}
      {isDark ? <IconSun /> : <IconMoon />}
    </button>
  );
}