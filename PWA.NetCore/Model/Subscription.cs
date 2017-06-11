using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA.NetCore.Model
{

    public class Subscription
    {
        public string endpoint { get; set; }
        public string p256dh { get; set; }
        public string auth { get; set; }
    }
}
