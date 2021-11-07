import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    translation: {
      "hello": {
        "1": "hello",
        "2": "hi"
      },
      "signin": "signin",
      "signup": "signup",
      "log out": "log out",
      "home": "home",
      "contact":"contact",
      "news":"news"
    }
  },
  chi: {
    translation: {
      "hello": {
        "1": "你好",
        "2": "心潮"
      },
      "signin": "登入",
      "signup": "报名",
      "register": "报名",
      "log out": "登出",
      "home": "家",
      "contact":"接触",
      "news":"消息"


    }
  },
  vi:{
    translation:{
      "hello":{
          "1":"Xin chào",
          "2":"Xin chào"
      },
      "signin":"Đăng nhập",
      "signup":"Đăng ký",
      "register":"Đăng ký",
      "log out": "Đăng xuất",
      "home": "Trang chủ",
      "contact": "Liên Hệ",
      "news":"Tin Tức"

      

  }
  }
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    whitelist: ['chi', 'en', 'vn'], // liet ke cac ngon ngu
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export default i18n;