---
title: 'Git Cheat Sheet: Useful Git Commands'
date: '25/8/2023'
cover_image: 'images/posts/git-cheat-sheet_cover.png'
tags: ['git', 'tips']
excerpt: 'Git can get tricky. Here are a bunch of useful git commands for common tasks.'
---

If you've ever used Git, you'll know it can get very tricky. Sometimes, even simple things like fixing a typo in a commit message can lead you down a rabbit hole of scary-looking commands. So, I've compiled a list of Git commands I use quite often. Let's get started.

## Don't push it

A lot of these commands change the commit history. It's never a good idea to change commits that have already been pushed - especially of others have already pulled the changes. So, until your sure everything is fine, don't push your commits.

## `git  rebase -i HEAD~n` - your best friend

I use this one a lot. It allows you to change the last _n_ commits in some way. Let's take a deeper look at how it works.

The `git rebase` command takes the current branch and replays it on top of another commit. So if you were on branch B and ran `git rebase A`, all the commits from B would be replayed on top of A. The `HEAD~n` part references the n-th ancestor of `HEAD` (`HEAD` points to whichever commit you are on). So, you're replaying the current branch on top of a previous version of itself. The result will be that you get to do some changes to the most recent _n_ commits.

### Fixing typos

Let's look at an example: you've been working on the master branch, making a simple program. This is what your commit history looks like:

```bash
$ git log --oneline --graph
* e4d8a72 (HEAD -> master) =Added a comment.
* c677c5b =Added some maths
* b9502a4 =Added a Hello Word program
* cc1154f =Added hello_world.py
```

But you've just noticed the typo on the first commit's message. To fix it, just run `git rebase -i HEAD~3` to modify the last 3 commits. Because we used the `-i` flag (which stands for _interactive_), we'll see a text editor pop up, showing something like this:

```bash
pick b9502a4 =Added a Hello Word program
pick c677c5b =Added some maths
pick e4d8a72 =Added a comment.
```

At the top of the file, we can see a list of instructions. The rebase command will roll the branch back to `HEAD~3` (which is the first commit), and then it will execute each of these instructions in order. The `pick` command tells git to replay the commit, without changing it. Below these instructions, there's a very handy comment, listing all the available commands. We want to fix the typo in the first commit, so we'll change the first `pick` to `reword`. After saving and closing the text editor, another one will pop up, allowing you to edit the commit message. Once again saving and closing it, the rebase operation will be complete. The commit history now looks like this:

```bash
$ git log --oneline --graph
* e1d3beb (HEAD -> master) =Added a comment.
* f0d8a8f =Added some maths
* 1ee1224 =Added a Hello World program
* cc1154f =Added hello_world.py
```

The typo was fixed!

### Reordering commits

With this same command, we can other things as well. Let's swap the two latest commits. First, run `git rebase -i HEAD~2`. On the rebase instructions, swap the two commits around. After saving and closing, as long as the commits don't interfere with each other, the rebase will complete (if they do interfere, just follow the instructions git gives you)

Let's take a look at our new history:

```bash
$ git log --oneline --graph
* 11fa8e2 (HEAD -> master) =Added some maths
* 514e987 =Added a comment
* b45c23c =Added a Hello World program
* 6171064 =Added hello_world.py
```

Do take a look at the other operations you can do with `git rebase`, it's a very useful tool.

## Line staging

Sometimes, you start coding, and when you realized, you've made a bunch of changes and haven't commited anything. This is where line staging comes in handy - it allows you to stage only _some_ parts of a file. Let's try it out by running `git add --patch hello_world.py`. This will divide your file into _hunks_ and present you with a diff for each hunk. You then have quite a few options, but the most important are:

- y - stage the hunk
- n - don't stage the hunk
- s - split the hunk into smaller hunks

With these tools, you can go through your file, staging only one change, commiting it, and repeating. By the end, the history would look like this:

```bash
$ git log --oneline --graph
* 9921420 (HEAD -> master) =Important change 3
* c37833b =Important change 2
* 281ec8f =Important change 1
* 11fa8e2 =Added some maths
* 514e987 =Added a comment
* b45c23c =Added a Hello World program
* 6171064 =Added hello_world.py
```

If your IDE has git integration, it most likely has a tool to do exactly this - which is usually much more straightforward.

## Stashes

Quite often, I'll find myself with a bunch of changes which I want to keep, but which aren't yet ready to commit. Or, after having done some important changes, I'll realize I need to do some git housekeeping, but I won't want to commit the changes just yet. Stashes are a way of saving changes without actually commiting them. Just run `git stash` to create one. Now, your work will be saved, _and your working tree will be clean_, because all the stashed changes were reverted. When you want to recover those changes, run `git stash apply` (this will apply the _latest_ stash), or `git stash pop` to also delete the stash.

## `git log --oneline --graph --all`

Over this post, I've frequently used this command to look at the commit history. `git log` displays a list of commits, from newest to oldest. With the `--oneline` flag, it will display the commit's SHA and message, making it fit into one line, the `--all` flag will make it display commits on all branhces, and with the `--graph` flag it will even make a nice graph:

```bash
$ git log --oneline --graph --all
* 4f8aa9f (HEAD -> master) =Important change 4
| * 530720c (develop) =Added utility functions in helper.py
|/
| * 2f7a4f6 (refs/stash) WIP on master: 9921420 =Important change 3
|/|
| * 23eeb79 index on master: 9921420 =Important change 3
|/
* 9921420 =Important change 3
* c37833b =Important change 2
* 281ec8f =Important change 1
* 11fa8e2 =Added some maths
* 514e987 =Added a comment
* b45c23c =Added a Hello World program
* 6171064 =Added hello_world.py
```

## Conclusion

That's just the tip of the iceberg. There are a lot more commands I think one should know when using git, but these can get you started. Of course, if you use a GUI, you likely won't need any of these, but I often find it easier to work in the command line than in a GUI, so knowing these git commands is a must. What other git tricks do you use frequently? Share your tips in the comments.
