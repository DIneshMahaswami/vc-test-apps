import { getLocalStorage, setLocalStorage, removeLocalStorage, OmniSearchBox } from "@mahaswami/vc-frontend";

import appConfigOptions from '../vegacore.json';
export const appTitlePrefix = () => {
    const appTitle = appConfigOptions.title;
    return appTitle;
};

export const canAccess = async (_params: any) => {
    //undefined means no override and default behavior based on vegacore.permissions.json configuration
    return undefined;
}

export const postLogin = async (_dataProvider: any, _user: any) => {

}    

export const postLogout = () => {
    
}    

/*
export const customHistoryLogger = async (resource: any, params : any, type: string) => {
    //do custom history logging here
}

export const customLogoBox = (permissions: any, isHorizontalLayout: boolean) => {
    return <span>Your Logo</span>;
}

export const customAppTitle = (permissions: any, isHorizontalLayout: boolean) => {
    return <span>Your Title</span>;
}
   
import { Layout} from "ra-ui-materialui";

//NOTE: Returning Layout only for demo. Our framework layout is more advanced. 
export const customLayout = (permissions: any) => {
    console.log("customLayout called "+  permissions);
    return Layout;
}
    
*/

export const queryClientConfig = (config: any) => {
    config = {
        defaultOptions: {
            queries: {
                staleTime: 0,                 
            },
        },
    };
    return config;
}

export const configureUserMenus = (_permissions: any) => {
    return []
}

export const configureToolbarActions = (_permissions: any) => {
    return [<OmniSearchBox key="omni-search-box"/>];
}

export const themes = (defaultThemes: any) => {
    return [...defaultThemes, desibelSalesTheme, desibelSales2Theme, desibelSales3Theme, desibelSales4Theme];
}

export const wrapCustomDataProvider = (_queryClient: any, dataProvider: any) => {
    return dataProvider;
}

import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './i18n/en';
import { desibelSalesTheme } from './themes/desibelSalesTheme';
import { desibelSales2Theme } from './themes/desibelSales2Theme';
import { desibelSales3Theme } from './themes/desibelSales3Theme';
import { desibelSales4Theme } from './themes/desibelSales4Theme';

const messages = {
    en: englishMessages,
} as any;

export const customizeI18nProvider = () => {
    const supportedLanguagesList = [
            { locale: 'en', name: 'English', key: 'en' },
        ]
    if (navigator.language.startsWith('en-') || navigator.language === 'en' ) {
        supportedLanguagesList[0].locale = navigator.language;
    } 
    return polyglotI18nProvider(
        (locale: string) => {
            const variation = locale.startsWith('en-') ? 'en' : locale;
            return messages[variation] ?? messages['en'];
        },
        navigator.language,
        supportedLanguagesList
    );  
}