
const tabs = document.querySelectorAll("[data-tab-target]");
const tabcon = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab)=> {
    tab.addEventListener('click',()=>{
        const target = document.querySelector(tab.dataset.tabTargets);
        tabcon.forEach((tabc_all)=>{
            tabc_all.classList.remove('active');
        });
        tabc_all.classList.add('active');
    });
})