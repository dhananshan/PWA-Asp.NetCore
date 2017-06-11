using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebPush.NetCore;
using PWA.NetCore.Model;

namespace PWA.NetCore.Controllers
{
    public class HomeController : Controller
    {

        private static string pushEndpoint;
        private static string p256dh;
        private static string auth;

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Fallback()
        {
            return View();
        }
        public IActionResult Error()
        {
            return View();
        }

        public void AddSubscription(Subscription Subscription) {

            pushEndpoint = Subscription.endpoint;
            p256dh = Subscription.p256dh;
            auth = Subscription.auth;
        }

        public void TriggerPush() {

            var subject = @"mailto:example@example.com";
            var publicKey = @"BGARDFzAbeYjcJIAL-0I5dj9B19W5ge6EGrB9rTFTCYBxvYv52r5j709jLnjKHPvFFsD9AVNAYI8oMR1Fu75SBo";
            var privateKey = @"pX2Jv8Gx5zcpV5692eWl5CpeeFucgWxyiKnXIeQq2wg";

            var subscription = new PushSubscription(pushEndpoint, p256dh, auth);
            var vapidDetails = new VapidDetails(subject, publicKey, privateKey);
            //var gcmAPIKey = @"[your key here]";

            var webPushClient = new WebPushClient();
            try
            {
                webPushClient.SendNotification(subscription, "payload", vapidDetails);
                //webPushClient.SendNotification(subscription, "payload", gcmAPIKey);
            }
            catch (WebPushException exception)
            {
                Console.WriteLine("Http STATUS code" + exception.StatusCode);
            }

        }
    }
}
