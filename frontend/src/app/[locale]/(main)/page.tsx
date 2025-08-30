import { getTranslations, setRequestLocale } from '@/i18n/server';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const res = await fetch("http://localhost:3056")
  const data = await res.json()
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl text-amber-300">{data.message}</h1>
        <hr />
        <p>{t("layout.welcome")}</p>
      </main>
    </div>
  );
}
