import Foundation
import XCPlayground

let API = "http://0.0.0.0:3000/user/login_new";

XCPSetExecutionShouldContinueIndefinitely()

let urlPath = API;
let url: NSURL = NSURL(string: urlPath)
let session = NSURLSession.sharedSession()
var request = NSMutableURLRequest(URL: NSURL(string: API))
request.HTTPMethod = "POST"

let task = session.dataTaskWithURL(url, completionHandler: {data, response, error -> Void in
    
    if error != nil {
        // If there is an error in the web request, print it to the console
        println(error.localizedDescription)
    }
    
    var err: NSError?
    var jsonResult = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: &err) as NSDictionary
    if err != nil {
        // If there is an error parsing JSON, print it to the console
        println("JSON Error \(err!.localizedDescription)")
    }
    
    var userData = jsonResult["user"] as NSDictionary;
    var userGifs = jsonResult["users"] as NSArray;
    
    for index in 0 ... 2 {
        var gif = userGifs[index] as NSDictionary;
        var thumb = gif["static"]?["static"] as NSDictionary;
        thumb["url"];
    }
})
task.resume()
