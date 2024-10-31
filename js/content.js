function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('.qa-active-chats').then((elm) => {
    console.log('Element is ready');
    if (elm) {
        // elm.addEventListener('click', () => {
        //     chrome.runtime.sendMessage({ message: "We have new chat on page" });
        // })
        // setTimeout(() => {
        //     elm.querySelector('.MuiTypography-root.MuiTypography-bodyL.mui-e6cs7z').innerHTML = 'Yoo_Alert';
        // }, 5000)
        
        let observer = new MutationObserver(() => {
            chrome.runtime.sendMessage({ message: "We have new chat on page" });
            // console.log('Произошло событие');
        });
        observer.observe(elm, {
            childList: true, // наблюдать за непосредственными детьми
            subtree: true, // и более глубокими потомками
        });
    }
});

//test
// setTimeout(() => {
//     let headerElement = document.querySelector('.MuiTypography-root.MuiTypography-bodyL.mui-e6cs7z');

//     if (headerElement) {
//         console.log('123')
//         chrome.runtime.sendMessage({ message: "We have new chat on page" });
//     }
// }, 2000)