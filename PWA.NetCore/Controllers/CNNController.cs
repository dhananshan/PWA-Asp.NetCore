using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PWA.NetCore.Service;

namespace PWA.NetCore.Controllers
{
    public class CNNController : Controller
    {
        private readonly IRSSReaderService _rssreader;
        const string CNN_RSS_Feed = "http://rss.cnn.com/rss/edition.rss";

        public CNNController(IRSSReaderService rssreader)
        {
            _rssreader = rssreader;
        }
        public async Task<IActionResult> Index()
        {
            var result = await _rssreader.ReadAsync(CNN_RSS_Feed);
            return View(result);
        }
    }
}
