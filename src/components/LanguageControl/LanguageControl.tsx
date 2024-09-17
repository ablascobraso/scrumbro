import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './LanguageControl.css';

import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';

const mapLanguageToOption = (language: string) => {
  const availableLanguages = ['en-US', 'es-ES', 'fr-FR', 'pt-BR', 'zh-Hant'];
  if (availableLanguages.includes(language)) {
    return language;
  }
  return 'en-US'; 
};

const languageOptions = [
  { value: 'en-US', label: 'English (US)', flag: 'US' },
  { value: 'es-ES', label: 'Spanish (ES)', flag: 'ES' },
  { value: 'fr-FR', label: 'French (FR)', flag: 'FR' },
  { value: 'pt-BR', label: 'Portuguese (BR)', flag: 'BR' },
  { value: 'zh-Hant', label: 'Chinese (Traditional)', flag: 'HK' },
];

export const LanguageControl: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('en-US'); 

  useEffect(() => {
    const detectedLanguage = mapLanguageToOption(i18n.language);
    setLanguage(detectedLanguage);
  }, [i18n.language]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl variant='outlined'>
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Change language' }}
        className='LanguageControlSelect'
        data-testid='language-control'
      >
        {languageOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Flag code={option.flag} style={{ width: '20px', marginRight: '10px' }} />
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
