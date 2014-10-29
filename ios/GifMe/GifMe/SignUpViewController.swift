//
//  SetupViewController.swift
//  GifMe
//
//  Created by Drew Dahlman on 10/3/14.
//  Copyright (c) 2014 GifMe. All rights reserved.
//

import Foundation
import UIKit

class SignUpViewController: UIViewController {
    
    let screenSize: CGRect = UIScreen.mainScreen().bounds
    let regularFont = UIFont (name: "ProximaNova-Light", size: 12)
    let boldFont = UIFont (name: "ProximaNova-Bold", size: 12)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Background
        self.view.backgroundColor = UIColor.whiteColor()
        
        // Draw logo
        var logoView = UILabel(frame: CGRect(x: (screenSize.width / 2) - (300 / 2) , y: 120 , width: 300, height: 35))
        logoView.font = UIFont (name: "ProximaNova-Light", size: 30)
        logoView.textAlignment = NSTextAlignment.Center
        logoView.text = "GifMe"
        logoView.textColor = UIColor(rgb: 0xd82153)
        self.view.addSubview(logoView)
        
        // Draw intro
        var labelView = UITextView(frame: CGRect(x: (screenSize.width / 2) - (300 / 2) , y: 170 , width: 300, height: 60))
        labelView.font = regularFont
        labelView.textAlignment = NSTextAlignment.Center
        labelView.text = "Register a GifMe account and start\rsaving, sharing and tagging gifs!"
        labelView.textColor = UIColor.blackColor()
        labelView.editable = false
        self.view.addSubview(labelView)
        
        // Draw Buttons
        var signUpButtonLabel = UILabel( frame: CGRect(x: 0 , y: 10, width: 300, height: 20))
        var signUpButton = UIButton( frame: CGRect(x: (screenSize.width / 2) - (300 / 2) , y: 310 , width: 300, height: 40))
        
        signUpButtonLabel.font = regularFont
        signUpButtonLabel.textAlignment = NSTextAlignment.Center
        signUpButtonLabel.text = "Go Back"
        signUpButtonLabel.textColor = UIColor.blackColor()
        
        signUpButton.backgroundColor = UIColor.whiteColor();
        signUpButton.layer.borderColor = UIColor(rgb: 0xd82153).CGColor
        signUpButton.layer.borderWidth = 1
        signUpButton.addTarget(self, action: "close:", forControlEvents: .TouchUpInside)
        
        signUpButton.addSubview(signUpButtonLabel);
        self.view.addSubview(signUpButton);
        
    }
    
    override func viewDidAppear(animated: Bool) {
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func close(sender: UIButton!){
        println("Close");
        self.performSegueWithIdentifier("signup_to_setup", sender: self);
    }
    
    func signIn(sender: UIButton!){
        println("sign me in!");
    }
}
