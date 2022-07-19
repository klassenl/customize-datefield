import { CalendarDate, parseDate } from "@internationalized/date";
import styles from "./styles.module.css";

export default function DatePickerNativeField({
  labelText,
  value,
  onChange,
}: {
  labelText: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.dateFieldWrapper}>
      <label htmlFor="real-input" className={styles.label}>
        {labelText}
      </label>
      <input
        className={styles.dateInput}
        id="real-input"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="date"
        required
      />
    </div>
  );
}
