import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontSizeOptions,
  fontFamilyOptions,
} from '@/constants/articleProps';
import { ArrowButton } from '@/ui/arrow-button';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import type { ArticleStateType, OptionType } from '@/constants/articleProps.ts';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  settings: ArticleStateType;
  setArticleState: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  settings,
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [draft, setDraft] = useState<ArticleStateType>(settings);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // синхронизация черновика, если родитель обновил данные извне
  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  // Клик вне - слушатель вешается только при открытом сайдбаре
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const handleDraftUpdate =
    (field: keyof ArticleStateType) =>
    (value: OptionType): void => {
      /* setDraft({...draft, [field]: value }); */
      setDraft((prevState) => ({ ...prevState, [field]: value }));
    };

  const handleApply = (): void => {
    setArticleState(draft);
    setIsSidebarOpen(false);
  };

  const handleReset = (): void => {
    setDraft(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  return (
    <>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            handleApply();
          }}
          onReset={() => {
            handleReset();
          }}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={draft.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleDraftUpdate('fontFamilyOption')}
          />

          <RadioGroup
            name="Размер шрифта"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            onChange={handleDraftUpdate('fontSizeOption')}
          />

          <Select
            title="Цвет шрифта"
            selected={draft.fontColor}
            options={fontColors}
            onChange={handleDraftUpdate('fontColor')}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={draft.backgroundColor}
            options={backgroundColors}
            onChange={handleDraftUpdate('backgroundColor')}
          />

          <Select
            title="Ширина контента"
            selected={draft.contentWidth}
            options={contentWidthArr}
            onChange={handleDraftUpdate('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="clear" htmlType="reset" />
            <Button title="Применить" type="apply" htmlType="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
