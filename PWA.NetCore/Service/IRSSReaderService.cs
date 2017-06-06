using PWA.NetCore.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA.NetCore.Service
{
    public interface IRSSReaderService
    {
        Task<List<RSSFeed>> ReadAsync(string url);
    }
}
