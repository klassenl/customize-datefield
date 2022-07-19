import { useRef, RefObject } from "react";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import { useDateFieldState } from "@react-stately/datepicker";
import {
  createCalendar,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import styles from "./styles.module.css";

interface DateFieldProps {
  locale: string;
  overruleDivider: boolean;
  label: string;
  value: CalendarDate;
  onChange: (value: unknown) => void;
}

export default function DateField(props: DateFieldProps) {
  const ref = useRef<HTMLDivElement>();
  const state = useDateFieldState({
    ...props,
    locale: props?.locale,
    createCalendar,
  });
  const { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div className={styles.dateFieldWrapper}>
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className={styles.dateField}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  );
}

function DateSegment({ segment, state }: any) {
  let ref = useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      ref={ref}
      {...segmentProps}
      className={`${styles.segment} ${
        segment.isPlaceholder ? styles.placeholder : ""
      }`}
    >
      {segment.text}
    </div>
  );
}
