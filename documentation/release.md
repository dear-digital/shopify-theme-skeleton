# 🚀 Project Release Documentation

## 🌐 Overview

This document provides a step-by-step guide on creating a new release for this repository. The process involves merging pull requests, creating a new tag, and auto-generating release notes to keep your users informed about the changes in the latest version.

## 🛠️ Prerequisites

- Ensure that all desired pull requests are merged into the target branch.
- Access to the GitHub repository for your project.

## 🔄 Semantic Versioning (SemVer)

We follow Semantic Versioning (SemVer) for versioning our releases. The version number is composed of three segments: MAJOR.MINOR.PATCH. For each release:

- **MAJOR:** Incompatible API changes.
- **MINOR:** Added functionality in a backward-compatible manner.
- **PATCH:** Backward-compatible bug fixes.

## 📦 Release Creation Steps

1. 🌐 **Navigate to GitHub Repository**

   Open your project's GitHub repository in a web browser.

2. 📑 **Access Releases Tab**

   Click on the `Releases` tab on the left side of the GitHub repository page.

   ![Releases Tab](https://imgtr.ee/images/2023/12/24/b171d96747204558ffa1c26ecdd9804e.png)

3. 🆕 **Create a New Release**

   Click the `Create a new release` button to initiate the release creation process. If there are previous releases, you might also see the option to "Draft a new release." In this case, click on `Draft a new release` to create a draft release.

   ![Create a New Release](https://imgtr.ee/images/2023/12/24/cacc35ecfeb59bee9e2ff8ffc2529844.png)

4. 🏷️ **Choose a Tag**

   Click on the `Choose a tag` field and type a new version number for your release. Finally click on `Create new tag` This will create a new tag.

   ![Choose a Tag](https://imgtr.ee/images/2023/12/24/1a81df7d25c62633d9fb89cf4f4ca50e.png)

5. 🌿 **Select Target Branch**

   Choose the target branch from which you want to create the release. This is typically your main or production branch.

   ![Select Target Branch](https://imgtr.ee/images/2023/12/24/453c184d51d05f291ee044a8b52c3b44.png)

6. 📝 **Auto-generate Release Notes**

   If creating a release from a new tag, the `Auto-generate release notes` button will be unlocked. Click this button to enable automatic generation.

   ![Auto-generate Release Notes](https://imgtr.ee/images/2023/12/24/76cc3643b4c7b39238a26059f6958822.png)

7. 👀 **Review Auto-generated Release Notes**

   The release notes will be automatically generated, including a title, body content, headings, changes, contributors, and links to corresponding pull requests. First-time contributors receive a special mention.

   ![53be8bcbb7e1663ca0f5569809f93bd5.png](https://imgtr.ee/images/2023/12/25/53be8bcbb7e1663ca0f5569809f93bd5.png)

8. 🚀 **Publish Release**

   Click `Publish release` to make your release notes public. Users can now react to your release notes, and a link to the full changelog is automatically generated.

   ![415e9f269e66122c1b1a61d321957ebd.png](https://imgtr.ee/images/2023/12/25/415e9f269e66122c1b1a61d321957ebd.png)

9. 🎉 **Final Release**

   ![8b03cf8b904a9c4c51380fedf993919c.png](https://imgtr.ee/images/2023/12/25/8b03cf8b904a9c4c51380fedf993919c.png)

## 🌈 Benefits of Auto-generating Release Notes

- Never miss another changelog, as release notes are auto-generated.
- Users can react to release notes for quick feedback.
- Automatic link to the full changelog allows users to compare changes.
- Detailed information about each change, including contributors and links to pull requests.
