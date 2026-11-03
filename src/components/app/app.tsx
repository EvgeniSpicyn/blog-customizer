import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';
//import Sidebar from '';
import { ArrowButton } from 'src/ui/arrow-button';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

//import { Separator } from '@/ui/separator';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  // 1. Создаём состояние: сайдбар закрыт по умолчанию
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Функция-обработчик: переключает состояние на противоположное
  const handleToggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // переменные, которые меняются сразу, как только пользователь вводит в инпуте
  const [draftBgColor, setDraftBgColor] = useState(
    defaultArticleState.backgroundColor.value
  );
  const [draftFontSize, setDraftFontSize] = useState<string | number>(
    defaultArticleState.fontSizeOption.value
  );
  const [draftFontFamily, setDraftFontFamily] = useState(
    defaultArticleState.fontFamilyOption.value
  );
  const [draftColor, setDraftColor] = useState(defaultArticleState.fontColor.value);
  const [draftContentWidth, setDraftContentWidth] = useState(
    defaultArticleState.fontColor.value
  );

  // переменные, управляющие CSS-переменными и изменяют стиль статьи
  const [appliedBgColor, setAppliedBgColor] = useState(
    defaultArticleState.backgroundColor.value
  );
  const [appliedFontSize, setAppliedFontSize] = useState<string | number>(
    defaultArticleState.fontSizeOption.value
  );
  const [appliedFontFamily, setAppliedFontFamily] = useState(
    defaultArticleState.fontFamilyOption.value
  );
  const [appliedColor, setAppliedColor] = useState(defaultArticleState.fontColor.value);
  const [appliedContentWidth, setAppliedContentWidth] = useState(
    defaultArticleState.fontColor.value
  );

  // функция кнопки "Применить"
  const handleApply = (): void => {
    console.log('Нажата кнопка Применить');
    setAppliedBgColor(draftBgColor);
    setAppliedFontSize(draftFontSize);
    setAppliedFontFamily(draftFontFamily);
    setAppliedColor(draftColor);
    setAppliedContentWidth(draftContentWidth);
    // закрываем sidebar
    setIsSidebarOpen(false);
  };

  // функция кнопки "Сбросить"
  const handleReset = (): void => {
    console.log(
      'Нажата кнопка Сбросить',
      `${defaultArticleState.backgroundColor.value}`
    );
    setAppliedBgColor(defaultArticleState.backgroundColor.value);
    //setDraftBgColor(defaultArticleState.backgroundColor.value);
    setAppliedFontSize(defaultArticleState.fontSizeOption.value);
    //setDraftFontSize(defaultArticleState.fontSizeOption.value);
    setAppliedFontFamily(defaultArticleState.fontFamilyOption.value);
    //setDraftFontFamily(defaultArticleState.fontFamilyOption.value);
    setAppliedColor(defaultArticleState.fontColor.value);
    setAppliedContentWidth(defaultArticleState.contentWidth.value);
    //setDraftColor(defaultArticleState.fontColor.value);
    setDraftBgColor(defaultArticleState.backgroundColor.value);
    setDraftFontSize(defaultArticleState.fontSizeOption.value);
    setDraftFontFamily(defaultArticleState.fontFamilyOption.value);
    setDraftColor(defaultArticleState.fontColor.value);
    setDraftContentWidth(defaultArticleState.contentWidth.value);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedFontFamily,
          '--font-size': appliedFontSize,
          '--font-color': appliedColor,
          '--container-width': appliedContentWidth,
          '--bg-color': appliedBgColor,
        } as CSSProperties
      }
    >
      <ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />

      {/* 4. Создаём обёртку для сайдбара */}
      {/* Пока мы просто показываем/скрываем блок. Анимацию сделаем позже. */}
      <aside className={clsx(styles.sidebar, isSidebarOpen && styles.open)}>
        <ArticleParamsForm
          //передаем в форму черновики и функции их обновления
          bgColor={draftBgColor}
          setBgColor={setDraftBgColor}
          fontSize={draftFontSize}
          setFontSize={setDraftFontSize}
          fontFamily={draftFontFamily}
          setFontFamily={setDraftFontFamily}
          fontColor={draftColor}
          setFontColor={setDraftColor}
          contentWidth={draftContentWidth}
          setContentWidth={setDraftContentWidth}
          // функции для кнопок
          onApply={handleApply}
          onReset={handleReset}
        />
      </aside>
      <Article />
    </main>
  );
};
