using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Xml.Serialization;
using PWA.NetCore.Model;
using System.IO;
using System.Xml.Linq;
using PWA.NetCore.Service;

namespace PWA.NetCore.Controllers
{
    public class CNAController : Controller
    {
        private readonly IRSSReaderService _rssreader;
        const string CNA_RSS_Feed = "http://www.channelnewsasia.com/rssfeeds/8395986";

        public CNAController(IRSSReaderService rssreader) {
            _rssreader = rssreader;
        }
        public async Task<IActionResult> Index()
        {
            var result = await _rssreader.ReadAsync(CNA_RSS_Feed);
            return View(result);
        }
    }
}
