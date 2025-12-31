/**  
 * 学科网动态多页还原脚本  
 * 功能：控制页面间的切换  
 */  
  
document.addEventListener('DOMContentLoaded', () => {  
    let currentPage = 1;  
    const totalPages = 3;  
  
    const nextBtn = document.getElementById('nextPageBtn');  
    const pageNumDisplay = document.getElementById('pageNum');  
    const pages = document.querySelectorAll('.page');  
  
    /**  
     * 切换到指定页面  
     * @param {number} index 页面索引 (1-3)  
     */  
    function goToPage(index) {  
        // 隐藏所有页面  
        pages.forEach(p => p.classList.remove('active'));  
          
        // 显示当前选中的页面  
        const targetPage = document.getElementById(`page${index}`);  
        if (targetPage) {  
            targetPage.classList.add('active');  
              
            // 更新底部控制器文字  
            pageNumDisplay.innerText = index;  
              
            // 滚动到顶部  
            window.scrollTo({ top: 0, behavior: 'smooth' });  
              
            console.log(`已跳转至第 ${index} 页`);  
        }  
    }  
  
    // 绑定按钮点击事件  
    nextBtn.addEventListener('click', () => {  
        currentPage++;  
        if (currentPage > totalPages) {  
            currentPage = 1; // 循环回到第一页  
        }  
        goToPage(currentPage);  
    });  
  
    // 为模拟列表项添加点击反馈  
    const cards = document.querySelectorAll('.resource-card, .list-item-horizontal');  
    cards.forEach(card => {  
        card.addEventListener('click', () => {  
            // 模拟点击进入详情页（即跳转到第二页）  
            currentPage = 2;  
            goToPage(currentPage);  
        });  
    });  
  
    // 侧边栏菜单简单交互  
    const menuItems = document.querySelectorAll('.menu-item');  
    menuItems.forEach(item => {  
        item.addEventListener('click', function() {  
            menuItems.forEach(i => i.classList.remove('active'));  
            this.classList.add('active');  
        });  
    });  
  
    console.log("多页演示初始化成功。");  
});  
