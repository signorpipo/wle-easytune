<p align="center">
<br>
<img src="https://github.com/SignorPipo/wle_easytune/blob/main/extra/showdonttell.gif">
</p>

## Overview
How annoying can it be to tune the value of a variable, put the headset on, test if the value is ok, removing the headset, tune it again and repeat? Well it's annoying even to write this to be honest.

Gladly, the Easy Tune is here to help! Now u can easily edit a value at runtime and avoid wasting 90% of the time removing the headset.
Be immersed while you tune <3

You can find a live version of the Easy Tune [here](https://elia-ducceschi.itch.io/easy-tune-wonderland-engine).

### Features
  - Tune a variable at runtime
  - Specify a new variable to add to the Easy Tune widget
  - Easily switch between variables
  - Show and hide the Easy Tune
  - Choose your handedness
  - Use it with hand tracking
  - Pin the Easy Tune
  - Be immersed

### Tricks
  - You can use the thumbstick to increase/decrease the value
  - If you press the squeeze button, you can use the thumbstick to change variable
  - You can show and hide the Easy Tune by pressing Bottom + Top buttons
  - You can click on the value to reset it
  - You can click on the step to reset it
  - You can pin the widget through the little `P` button
  - You can specify a variable as the one that should be selected as first when the game is executed
    - You just have to specify the name inside the `easy_tune.js` script
    - You must be sure that the variable is created before the start method is called to use this trick
  - Use the `PP.SetEasyTuneWidgetActiveVariable` function to specify the active variable
    - This way you don't have to select it every time you start the app

## How to import
To import the Easy Tune you have to:
  - Import the `pp` folder into your `project` folder, along with all the subfolders
    - This `pp` folder should only contain the `pp.js` file, apart for other folders
    - You must link this folder in the Java Script Sources list (under Project Settings) before any other folders that contain scripts that use the `PP` namespace
    - This is needed to make sure the `PP` namespace is created before it is used 
    - If you put it as first (after `/js/components/`) you should be safe
  - Add the `easy-tune` component to an object
    - You can add it to one of the hands object to have it on your wrist
    - `_myHandedness`: this optimize the rotation and local position of the Easy Tune based on how you want to use it
    - `_myShowOnStart`: specify if the Easy Tune will be visible right from the start
    - `_myShowVisibilityButton`: specify if you want to show the little visibility button
    - `_myPlaneMaterial`: create a new Flat material from the resources editor panel and add it here
      - to set it as Flat you have to create a new temp mesh object and edit the material from there
      - after creating it you may need to restart the engine
    - `_myTextMaterial`: set this to `DefaultFontMaterial`
  - Add the `tool-cursor` component to one of your hands object
    - `_myHandedness`: specify which hands is being used
    - `_myPulseOnHover`: specify if you want the gamepad to pulse on hover
    - `_myShowFingerCursor`: specify if you want to show the finger cursor for hand tracking, useful if you don't have a mesh on the hand
    - `_myCursorMesh`: set this to `PrimitiveSphere`
    - `_myCursorMaterial`: set this to the same Flat material created above

### Extra
  - **Gamepad**
    - If you want the gamepad extra features you will need to import it too
    - Extra features include
      - Use thumbstick to easily edit the values
      - Hide and show the Easy Tune with Bottom + Top buttons
    - You can find a guide on how to import the gamepad [here](https://github.com/SignorPipo/wle_gamepad)
  - **Font**
    - The Easy Tune has been tested using the `courier_new` font
    - You can find it inside the `assets` folder
    - It can be set as the project font from the Project Settings
    - Luckily the default font does its job too

## How to use
You can see an example on how to use the easy tune for your own variables inside the `magic_sphere.js` script.

The steps are pretty simple:
  - Add the variable to the Easy Tune Variables like this: `PP.EasyTuneVariables.addVariable(new PP.EasyTuneNumber("Magic Sphere X", 0, 0.5, 4))`
    - You can do this anytime, but if you add them on `init` you can specify it as the first variable selected (explained in the Tricks section)
  - When u want to use that variable u just write `PP.EasyTuneVariables.get("Magic Sphere X").myValue`
  - At this point u just tune the variable at runtime
  - When u have found a value that fits, u just write it down and overwrite the Easy Tune Variable with the plain value you have found

### Supported Types
The Easy Tune supports the following types:
  - Number
    - You create it as follow: `PP.EasyTuneVariables.addVariable(new PP.EasyTuneNumber("Number 1", 7.3, 0.5, 4))`
    - The first parameter is the default value
    - The second parameter is the default step
    - The third parameter is the number of decimal places
  - Integer
    - You create it as follow: `PP.EasyTuneVariables.addVariable(new PP.EasyTuneInteger("Integer 1", 3, 1))`
    - The first parameter is the default value
    - The second parameter is the default step
  - Bool
    - You create it as follow: `PP.EasyTuneVariables.addVariable(new PP.EasyTuneBool("Bool 1", true))`
    - The first parameter is the default value

Adding new types is as simple as creating the widget to edit them, since after that you just need to attach it to the Easy Tune Widget.

Just look at how the Easy Tune Number Widget is implemented if you want to try!

## License
You are free to use this in your projects, just remember to credit me somewhere!

## Credits
Oculus Quest Controller Models by Jezza3D on Sketchfab with small adjustments made by me.
