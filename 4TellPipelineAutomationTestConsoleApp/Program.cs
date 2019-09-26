using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Diagnostics;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;

namespace _4TellPipelineAutomationTestConsoleApp
{
  
    class Program
    {
        
       
        static void Main(string[] args)
        {
            string driverOptions;
            IWebDriver driver;
            if (args.Length < 1)
            {
                driverOptions = "headless";


            }
            else
            {
                string argument = args[0].ToString().ToLower();
                driverOptions = argument;
            }
            //driverOptions = "noheadless";
            string startupPath = Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).Parent.FullName + "\\drivers";
            //Console.WriteLine(startupPath);
            //driver = new ChromeDriver(startupPath);
            ChromeOptions options = new ChromeOptions();
            if (driverOptions == "headless")
            {

                options.AddArgument("--headless");
            }
            driver = new ChromeDriver(startupPath, options);
            driver.Navigate().GoToUrl("https://www.google.com");
            string pageTitle = driver.Title;
            Assert.IsTrue(pageTitle.ToLower().Contains("google"));
            driver.Quit();
            Console.WriteLine("TEST END>>>>>>>>>>>>>>>>>>>>");
        }
        //public void NavigateToGoogle()
        //{
        //    createChromeDriver();
        //    string startupPath = Path.Combine(Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).Parent.FullName, "\\drivers\\chromedriver.exe");
        //    Debug.WriteLine(startupPath);
        //    driver.Navigate().GoToUrl("https://www.google.com");
        //    string pageTitle = driver.Title;
        //    Assert.IsTrue(pageTitle.ToLower().Contains("google"));
        //}
        //public void createChromeDriver(string driverOptions)
        //{
        //    //string startupPath = Path.Combine(Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).Parent.FullName, "\\drivers\\chromedriver.exe");
        //    string startupPath = Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).Parent.FullName + "\\drivers";
        //    //Console.WriteLine(startupPath);
        //    //driver = new ChromeDriver(startupPath);
        //    ChromeOptions options = new ChromeOptions();
        //    if (driverOptions == "headless")
        //    {

        //        options.AddArgument("--headless");
        //    }
        //    driver = new ChromeDriver(startupPath, options);
        //}
    }
}
