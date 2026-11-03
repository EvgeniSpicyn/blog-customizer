import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontSizeOptions,
  fontFamilyOptions,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Button } from 'src/ui/button';

import type { OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Вспомогательная функция: ищет объект опции по значению (value)

const findOption = (options: OptionType[], value: string | number): OptionType => {
  const found = options.find((opt) => opt.value === String(value));
  if (!found) {
    // Если не нашли — возвращаем первую опцию как дефолт.
    // Это гарантирует, что тип всегда будет OptionType, а не undefined.
    return options[0];
  }
  return found;
};

type Props = {
  bgColor: string;
  setBgColor: (val: string) => void;
  fontSize: string | number;
  setFontSize: (val: string | number) => void;
  fontFamily: string;
  setFontFamily: (val: string) => void;
  fontColor: string;
  setFontColor: (val: string) => void;
  contentWidth: string;
  setContentWidth: (val: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  bgColor,
  setBgColor,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  fontColor,
  setFontColor,
  contentWidth,
  setContentWidth,
  onApply,
  onReset,
}: Props): React.JSX.Element => {
  return (
    <>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2 className={styles.title}>задайте параметры</h2>
        <Select
          selected={findOption(fontFamilyOptions, fontFamily)}
          options={fontFamilyOptions}
          onChange={(newOption) => {
            setFontFamily(newOption.value);
            console.log(`Выбран шрифт ${newOption.value}`);
          }}
          title="Шрифт"
        />
        <RadioGroup
          name="Размер шрифта"
          options={fontSizeOptions}
          selected={findOption(fontSizeOptions, fontSize)}
          onChange={(newOption) => {
            //const sizeNumber = Number(newOption.value.replace('px', ''));
            setFontSize(newOption.value); // Теперь это число: 25, а не "25px"

            //setFontSize(newOption.value);
            console.log(`Выбран размер шрифта ${newOption.value}`);
          }}
          title="Размер шрифта"
        />
        <Select
          selected={findOption(fontColors, fontColor)}
          options={fontColors}
          onChange={(newOption) => {
            setFontColor(newOption.value);
            console.log(`Выбран цвет текста ${newOption.value}`);
          }}
          title="Цвет шрифта"
        />
        <Separator />
        <Select
          selected={findOption(backgroundColors, bgColor)}
          options={backgroundColors}
          onChange={(newOption) => {
            setBgColor(newOption.value);
            console.log(`Выбран цвет фона ${newOption.value}`);
          }}
          title="Цвет фона"
        />
        <Select
          selected={findOption(contentWidthArr, contentWidth)}
          options={contentWidthArr}
          onChange={(newOption) => {
            setContentWidth(newOption.value);
            console.log(`Выбрана ширина текста ${newOption.value}`);
          }}
          title="Ширина текста"
        />
        <div className={styles.bottomContainer}>
          <Button title="Сбросить" type="clear" onClick={onReset} />
          <Button title="Применить" type="apply" onClick={onApply} />
        </div>
      </form>
    </>
  );
};
