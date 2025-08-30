import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();
  return (
      <h1 className="text-3xl">{t('not-found')}</h1>
  );
};

export default Page;
