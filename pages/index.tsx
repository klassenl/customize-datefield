import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { parseDate, CalendarDate } from "@internationalized/date";
import DatePickerCustomField from "../components/date-picker-custom-field";
import DatePickerNativeField from "../components/date-picker-native-field";
import styles from "../styles/Home.module.css";

type Locale = keyof typeof locales;

const locales = {
  us_english: "en-US",
  uk_english: "en-GB",
  canada_english: "en-CA",
  canada_french: "en-FR",
  belgium_french: "fr-BE",
  japan: "ja-JP",
  china_chinese: "zh-cn",
  hk_chinese: "zh-hk",
  india_english: "en-IN",
  india_hindi: "hi-IN",
  sweden: "se-SE",
  saudi_arabia: "ar-SA",
  moldova_russian: "ru-MD",
};

const localeList = Object.keys(locales);

function getCurrentDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toJSON().slice(0, 10);
}

const createDate = (locale = "en-US") => {
  const date = new Date();
  return new Intl.DateTimeFormat(locale).format(date);
};
const date = new Date(2012, 5);
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let dateTimeFormat = new Intl.DateTimeFormat("en-US");

const Home: NextPage = () => {
  const detectedLocale = useRef<string>();
  const [locale, setLocale] = useState<string>(locales.us_english);
  const [value, setValue] = useState<CalendarDate>(parseDate(getCurrentDate()));
  const [navigator, setNavigator] = useState<typeof window.navigator>();
  const [isDividerOverruled, setIsDividerOverruled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLocale = window.navigator.languages[0];
      detectedLocale.current = browserLocale;
      setLocale(browserLocale);
      setNavigator(window.navigator);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Input type date format experiment</title>
        <meta
          name="description"
          content="Overrule date field format while using native date picker."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.info}>
          <p>{navigator?.userAgent}</p>
        </div>
        <div>
          <div className={styles.block}>
            <DatePickerCustomField
              overruleDivider={isDividerOverruled}
              onChange={setValue}
              value={value}
              locale={locale}
            />
            <select
              className={styles.select}
              onChange={(e) => setLocale(locales[e.target.value as Locale])}
            >
              {localeList.map((option) => (
                <option
                  key={option}
                  className={styles.option}
                  value={option}
                  selected={locales[option as Locale] === locale}
                >
                  {`${locales[option as Locale]} (${option})`}
                </option>
              ))}
            </select>
            <button
              className={[
                styles.button,
                isDividerOverruled ? styles.overruled : "",
              ].join(" ")}
              onClick={() => setIsDividerOverruled(!isDividerOverruled)}
            >
              {isDividerOverruled
                ? "separator overruled"
                : "overrule separator"}
            </button>
          </div>
          <div className={styles.block}>
            <DatePickerNativeField
              labelText={`${detectedLocale?.current} <- real`}
              onChange={(value: string) => setValue(parseDate(value))}
              value={value?.toString()}
            />
            <div className={styles.textBlock}>
              {`<- Native date field, format is set by browser language prefs, if none, system language prefs. Cannot customize.`}
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/klassenl/customize-datefield">https://github.com/klassenl/customize-datefield</a>
      </footer>
    </div>
  );
};

export default Home;
