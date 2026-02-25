// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Seo from '../components/common/Seo';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('home.seo_title')}
        description={t('home.seo_description')}
        type="website"
      />
      <Hero />
      <ContactSection />
    </>
  );
}
