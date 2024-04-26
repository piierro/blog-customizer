import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Separator } from 'components/separator';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState,  useRef, FormEvent } from 'react';
import { useOutsideClick } from './ArticleCloseHook'
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';


type ArticleParamsFormProps = {
	setArticleState: (value: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ setArticleState }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	useOutsideClick(formRef, () => {
	  setIsSidebarOpen(false);
	})

	const handleChange = (name: keyof ArticleStateType, option: OptionType)  => {
		setFormState((prevState) => ({
			...prevState,
			[name]: option
		  }));
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(formState);
		// setIsSidebarOpen(false); 
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		// setIsSidebarOpen(false); 
	};

	return (
		<>
		<ArrowButton isOpen={isSidebarOpen}  onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
		  <aside className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}>
			<form ref={formRef} className={styles.form} onReset={handleReset} onSubmit={handleSubmit}>
			<Text weight={800} size={31} uppercase={true}>Задайте параметры</Text>
			<Select
			    title={'шрифт'}
				options={fontFamilyOptions}
			    selected={formState.fontFamilyOption}
				onChange={(option) => handleChange('fontFamilyOption', option)}
			/>
			 <RadioGroup
				title={'размер шрифта'}
				options={fontSizeOptions}
				selected={formState.fontSizeOption}
				onChange={(option) => handleChange('fontSizeOption', option)} name={''}
			/>
			<Select
			    title={'цвет шрифта'}
				options={fontColors}
			    selected={formState.fontColor}
				onChange={(option) => handleChange('fontColor', option)}
			/>
			<Separator />
			<Select
			    title={'цвет фона'}
				options={backgroundColors}
			    selected={formState.backgroundColor}
				onChange={(option) => handleChange('backgroundColor', option)}
			/>
			<Select
			    title={'ширина контента'}
				options={contentWidthArr}
			    selected={formState.contentWidth}
				onChange={(option) => handleChange('contentWidth', option)}
			/> 
			<div className={styles.bottomContainer}>
				<Button title='Сбросить' type='reset' />
				<Button title='Применить' type='submit'  />
			</div>
			</form>
		  </aside>
		</>
	);
};
