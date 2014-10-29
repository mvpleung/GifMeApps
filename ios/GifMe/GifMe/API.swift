//
//  API.swift
//  GifMe
//
//  Created by Drew Dahlman on 10/4/14.
//  Copyright (c) 2014 GifMe. All rights reserved.
//

import Foundation

protocol APIProtocol {
    func didReceiveAPIResults(results: NSDictionary)
}

class API {
    var delegate: APIProtocol
    let base_api = "http://0.0.0.0:3000/"
    
    init(delegate: APIProtocol) {
        self.delegate = delegate
    }
    
    func login_post(params : Dictionary<String, String>, url : String, postCompleted : (succeeded: Bool, code: Double, user_data: NSDictionary?) -> ()) {
        var request = NSMutableURLRequest(URL: NSURL(string: "\(base_api)\(url)"))
        var session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        
        var err: NSError?
        request.HTTPBody = NSJSONSerialization.dataWithJSONObject(params, options: nil, error: &err)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        var task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
//            println("Response: \(response)")
            var strData = NSString(data: data, encoding: NSUTF8StringEncoding)
//            println("Body: \(strData)")
            var err: NSError?
            var json = NSJSONSerialization.JSONObjectWithData(data, options: .MutableLeaves, error: &err) as? NSDictionary
            
            var msg = "No message"
            
            // Did the JSONObjectWithData constructor return an error? If so, log the error to the console
            if(err != nil) {
//                println(err!.localizedDescription)
                let jsonStr = NSString(data: data, encoding: NSUTF8StringEncoding)
                
                // Bad Password
                if( strData == "401" ){
                    postCompleted(succeeded: false, code: 401, user_data: nil)
                }
                
                if( strData == "404" ){
                    postCompleted(succeeded: false, code: 404, user_data: nil)
                }
            }
            else {
                
                if let parseJSON = json {
//                    println(parseJSON["user_data"]?["id"])
                    println(
                    postCompleted(succeeded: true, code: 200, user_data: parseJSON)
                }
                
            }
        })
        
        task.resume()
    }
    
}