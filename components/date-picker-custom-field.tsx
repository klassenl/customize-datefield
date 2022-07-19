import DateField from "./date-field";
import { parseDate, CalendarDate } from "@internationalized/date";
import { useFocusWithin } from "@react-aria/interactions";
import styles from "./styles.module.css";

export default function DatePickerCustomField({
  overruleDivider,
  locale,
  value,
  onChange,
}: {
  overruleDivider: boolean;
  locale: string;
  value: CalendarDate;
  onChange: (value: any) => void;
}) {
  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: (e) => {
      const input = e.currentTarget.querySelector(
        "input"
      ) as HTMLInputElement & { showPicker?: () => void };
      input?.showPicker && input.showPicker();
    },
  });

  return (
    <div
      className={[
        styles.fieldWrapper,
        overruleDivider ? styles.separatorOverruled : "",
      ].join(" ")}
      {...focusWithinProps}
    >
      <DateField
        locale={locale}
        overruleDivider={overruleDivider}
        label={`${locale} <- faked`}
        onChange={onChange}
        value={value}
      />
      <input
        className={styles.hiddenPicker}
        onChange={(e) => {
          onChange(parseDate(e.target.value));
        }}
        value={value.toString()}
        type="date"
        aria-hidden
      />
    </div>
  );
}
