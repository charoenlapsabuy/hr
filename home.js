const puppeteer = require('puppeteer');

async function runPuppeteerScript() {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: [''],
      headless: false,
      devtools: false,
      defaultViewport: {
        width: 1100,
        height: 1000
      }
    });
  
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://wpa04.tigersoftcloud.com:7071", ["geolocation", "notifications"]);
  
    const page = await browser.newPage();
  
    // central world
    const latitude = 13.7465181;
    const longitude = 100.5391233;
    // Rama2
    // const latitude = 13.6467908;
    // const longitude = 100.4299871;
    await page.setGeolocation({ latitude, longitude });
  
    await page.goto('https://wpa04.tigersoftcloud.com:7071/ATPFRIEND/workplaze/login/E146B4A966?parent=portal');
    
    console.log('Filling in the username and password...');
    await page.type('#txtUser', '1166093');
    await page.type('#txtPWD', '3042');
    console.log('Clicking the Login button...');
    await page.click('#Button1');
    console.log('Waiting for navigation after login...');
    
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    await Promise.all([
      timeoutPromise,
      page.setGeolocation({ latitude, longitude }),
      page.goto('https://wpa04.tigersoftcloud.com:7071/ATPFRIEND/Workplaze/Mobile/Work/WebCheckIn_m.aspx?mode=loc')
    ]);
  
    console.log('Start select');
    const selectElement = await page.waitForSelector('#MainContent_DrpStatus', { visible: true });
  
    const buttonSelector = '#MainContent_Button1';
    const buttonElement = await page.waitForSelector(buttonSelector, { visible: true });
  
    await Promise.all([
      timeoutPromise,
      page.select('#MainContent_DrpStatus', '3')
    ]);
  
    await page.evaluate(async () => {
        for (let i = 2; i >= 0; i--) {
          console.log(`Delaying for ${i} seconds...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        $('#MainContent_Button1').click();
    });
    
    await page.evaluate(async () => {
        for (let i = 1; i >= 0; i--) {
          console.log(`Delaying for ${i} seconds...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      
        $('#lblCancel2').click(); // ตั้งให้กดปุ่ม ยกเลิก
        // $('#lblSubmit').click(); // ตั้งให้กดปุ่ม บันทึก
    });
  
    console.log('Script completed. Closing the browser...');
    // await browser.close(); // สั่งปิด browser เมื่อทำงานเสร็จ
  }
  runPuppeteerScript();