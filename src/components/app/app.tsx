import { defaultArticleState } from '@/constants/articleProps.ts';
import { useState } from 'react';

import { Article } from '@components/article';
import { ArticleParamsForm } from '@components/article-params-form';

import type { ArticleStateType } from '@/constants/articleProps.ts';

export const App = (): React.JSX.Element => {
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);
  return (
    <>
      <ArticleParamsForm settings={articleState} setArticleState={setArticleState} />
      <Article settings={articleState} />
    </>
  );
};
