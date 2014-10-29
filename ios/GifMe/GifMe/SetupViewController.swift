//
//  SetupViewController.swift
//  GifMe
//
//  Created by Drew Dahlman on 10/3/14.
//  Copyright (c) 2014 GifMe. All rights reserved.
//

import Foundation
import UIKit

class SetupViewController: UIViewController {
    
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
        labelView.text = "GifMe makes saving, sharing & organizing gifs easier."
        labelView.textColor = UIColor.blackColor()
        labelView.editable = false
        self.view.addSubview(labelView)
        
        // Draw Buttons
        var signInButtonLabel = UILabel( frame: CGRect(x: 0 , y: 10, width: 300, height: 20))
        var signInButton = UIButton( frame: CGRect(x: (screenSize.width / 2) - (300 / 2) , y: 250 , width: 300, height: 40))
        
        signInButtonLabel.font = regularFont
        signInButtonLabel.textAlignment = NSTextAlignment.Center
        signInButtonLabel.text = "Sign In"
        signInButtonLabel.textColor = UIColor.blackColor()
        
        signInButton.backgroundColor = UIColor.whiteColor();
        signInButton.layer.borderColor = UIColor(rgb: 0xd82153).CGColor
        signInButton.layer.borderWidth = 1
        signInButton.addTarget(self, action: "signIn:", forControlEvents: .TouchUpInside)
        
        signInButton.addSubview(signInButtonLabel);
        self.view.addSubview(signInButton);
        
        // Draw Buttons
        var signUpButtonLabel = UILabel( frame: CGRect(x: 0 , y: 10, width: 300, height: 20))
        var signUpButton = UIButton( frame: CGRect(x: (screenSize.width / 2) - (300 / 2) , y: 310 , width: 300, height: 40))
        
        signUpButtonLabel.font = regularFont
        signUpButtonLabel.textAlignment = NSTextAlignment.Center
        signUpButtonLabel.text = "Sign Up"
        signUpButtonLabel.textColor = UIColor.blackColor()
        
        signUpButton.backgroundColor = UIColor.whiteColor();
        signUpButton.layer.borderColor = UIColor(rgb: 0xd82153).CGColor
        signUpButton.layer.borderWidth = 1
        signUpButton.addTarget(self, action: "signUp:", forControlEvents: .TouchUpInside)
        
        signUpButton.addSubview(signUpButtonLabel);
        self.view.addSubview(signUpButton);

    }
    
    override func viewDidAppear(animated: Bool) {
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func signUp(sender: UIButton!){
        println("sign me up!");
        self.performSegueWithIdentifier("setup_to_signup", sender: self);
    }
    
    func signIn(sender: UIButton!){
        println("sign me in!");
        self.performSegueWithIdentifier("setup_to_signin", sender: self);
    }
}
