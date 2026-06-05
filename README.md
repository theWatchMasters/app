# NowPower App

This is the official repository for the frontend of NowPower.

NowPower helps you improve their productivity. Pledge money on your daily tasks. If you complete the task, receive your money back. If you don't, your money gets stored in a vault which you can earn back from by completing tasks. If money remains in your vault for over a month, it gets donated to charity.

## Useful Links

- The [backend](https://github.com/theWatchMasters/backend) repository: Contains the Express.js backend powering the app
- The [specifications](https://github.com/theWatchMasters/specs) repository: Contains the specifications for the NowPower app
- The root [GitHub Organisation](https://github.com/theWatchMasters)

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Set up the [backend](https://github.com/theWatchMasters/backend) locally

3. Copy `.env.example` to `.env` and set the `EXPO_PUBLIC_API_BASE_URL` to `http://localhost:3001/`

   ```
   EXPO_PUBLIC_API_BASE_URL=http://localhost:3001/
   ```

4. Download Android Studio (with an Android SDK). [Set up a device for debugging](https://developer.android.com/studio/debug/dev-options#enable)

5. If the `ANDROID_HOME` environment variable isn't set, set it to the location of your SDK

   **Windows:**

   ```bat
   echo %ANDROID_HOME%
   rem If the above output isn't %ANDROID_HOME%, continue with step 6

   set ANDROID_HOME=C:\path\to\Android\Sdk
   rem An example path is %LOCALAPPDATA%\Android\Sdk
   ```

   **Linux:**

   ```bash
   echo $ANDROID_HOME
   # If the above output isn't empty, continue with step 6

   export ANDROID_HOME=/path/to/Android/Sdk
   # An example path is ~/Android/Sdk
   ```

6. Start the app

   ```bash
   yarn expo run android
   ```
