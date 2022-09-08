function ee(str) {
    if (lang.hasOwnProperty(str)){
        return lang[str];
    }else{
        return str;
    }
}