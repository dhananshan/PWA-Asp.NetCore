using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace PWA.NetCore.Controllers
{
    public class CNAController : Controller
    {
        public IActionResult Index()
        {
             using (HttpClient client = new HttpClient())
                {
                //client.BaseAddress = new Uri("www.channelnewsasia.com/rssfeeds/8395986");
                }
            return View();
        }
    }
}
