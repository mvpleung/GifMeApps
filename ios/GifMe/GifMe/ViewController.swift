//
//  ViewController.swift
//  GifMe
//
//  Created by Drew Dahlman on 10/3/14.
//  Copyright (c) 2014 GifMe. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    let user: NSUserDefaults = NSUserDefaults.standardUserDefaults();
    let screenSize: CGRect = UIScreen.mainScreen().bounds
    let regularFont = UIFont (name: "ProximaNova-Light", size: 12)
    let boldFont = UIFont (name: "ProximaNova-Bold", size: 12)
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
    }
    
    override func viewDidAppear(animated: Bool) {
        if let userIsNotNil = user.objectForKey("user_id") as? String{
            println("found user");
        } else {
            println("No user take to setup screen");
            self.performSegueWithIdentifier("intro_to_setup", sender: self);
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

