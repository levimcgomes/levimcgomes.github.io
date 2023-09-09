---
title: 'Tips On Writing Clean and Maintainable Code'
date: '28/7/2023'
cover_image: 'images/posts/clean-code_cover.png'
tags: ['coding', 'tips', 'C#']
excerpt: 'Ever found yourself going back to a project and not understanding your own code? By following some simple design principles, your code will be easier to understand, both for yourself and others.'
---

If you've read my [recent update](https://levimcgomes.github.io/blog/updates_status1) about this blog, you'll know I've recently gotten back to working on my metroidvania game. One of the issues I've faced is that most of my code doesn't really make sense anymore, and I'm often left staring at a script and trying to figure out what it was meant for. While this is a pretty common issue when returning to a project, it doesn't - and shouldn't - have to be this way. By writing clean code, and following good design patterns, you're doing a favour to yourself (and to others, if you're working in a team), as your code will be much easier to understand. So, I'd like to share some tips I've gathered both from this project and others to help you write more maintainable code. Without further ado, let's get started!

> **Note**: in these tips, I try to be as language- and paradigm-agnostic as possible, but some tips will be specifically about OOP, since that's the paradigm I'm using to make my game. Further on, all code examples will be in C#, since it's the language I know the best, but they should still apply to whatever language you use.

## 1. Be thoughtful when naming things

This should go without saying, but giving clear names to variables, functions, classes and other symbols is really important. Take the following example (as a side note, this code likely isn't very realistic, but it illustrates the point):

```cs showLineNumbers
DB GetDB(string accTok, string url){
	try{
		var db = HTTPWrapper.Conn(accTok, url)
		return db.rd();
	}
	catch(Exception e){
		ExcHandler.Handle(e);
	}
}
```

You might think you'll remember what everything means, but most likely you won't - so give things names that clearly explain what they are. Looking at this code, can you tell what exactly it's doing? I just wrote it, and I'm not sure I understand! Here are some of the things wrong with this code:

- What exactly is `DB`? `DB` usually stands for "database", but it might mean something else.
- What's `accTok`? Once again, from context, we can assume it means "access token", but a clearer name wouldn't hurt.
- Is `db` the database? Or is it something else? We are making a call to `HTTP.Conn` - what's that? Looking at this code, `Conn` most likely means "connection" - we can assume that because we're receiving a URL and using HTTP, but in other contexts, it could be less clear. Since we're making a connection, `db` holds that connection. But its name is misleading, and one could easily assume it holds the actual database (`var` doesn't help either, but that's a discussion for another time). Further on, what does `rd` do? What does it stand for? With this context, it's almost impossible to guess what it is.
- From context, it's pretty clear `ExcHandler` stands for "exception handler", but writing it out fully would be better.

Given this, one might refactor this code as follows:

```cs showLineNumbers
Database GetDatabase(string accessToken, string url){
	try{
		var databaseServer = HTTPWrapper.Connect(url, accessToken)
		return databaseServer.read();
	}
	catch(Exception e){
		ExceptionHandler.Handle(e);
	}
}
```

I hope you'll agree that this code is much easier to understand.

## 2. Be consistent

Having a consistent coding style is very helpful, because it allows you to look at something and know what it is without having to think about it. It doesn't really matter what you choose, all that matters is that you choose a style and stick with it. For instance, take the following code:

```cs showLineNumbers
myType my_function(MyOtherType input){
	return a_private_field.AMethod(input.A_PUBLIC_FIELD._anotherPublicField);
}
```

It certainly doesn't look good, and it's hard to parse. If instead we used consistent naming conventions, it could look like this:

```cs showLineNumbers
MyType MyFunction(MyOtherType input){
	return _aPrivateField.AMethod(input.APublicField.AnotherPublicField);
}
```

Which is much easier to read and understand.

## 3. Don't Repeat Yourself (DRY)

Consider the following example:

```cs showLineNumbers
void foo(int x, int y){
	int z = x+2*y;
	System.Console.WriteLine($"The function foo was called on {x} and {y} and computed {z}.");
}

void bar(int x, int y){
	int z = 2*x-y;
	System.Console.WriteLine($"The function bar was called on {x} and {y} and computed {z}.");
}

void baz(int x, int y){
	int z = x*y+2;
	System.Console.WriteLine($"The function baz was called on {x} and {y} and computed {z}.");
}
```

The calls to `WriteLine` in each function are almost equal, so it would be smart to extract it to its own method:

```cs showLineNumbers
void PrintFunctionInfo(string name, int x, int y){
	System.Console.WriteLine($"The function {name} was called on {x} and {y} and computed {z}.");
}

void foo(int x, int y){
	int z = x+2*y;
	PrintFunctionInfo(nameof(foo), x, y);
}

void bar(int x, int y){
	int z = 2*x-y;
	PrintFunctionInfo(nameof(bar), x, y);
}

void baz(int x, int y){
	int z = x*y+2;
	PrintFunctionInfo(nameof(baz), x, y);
}
```

This way, we can clearly see that each function is doing the same kind of thing, which makes the code clearer. Now, if we decide we actually want to print this message to a file, we just need to change one function, instead of three.

## 4. Follow good design principles

This one is a bit more abstract, as it heavily depends on what language and paradigm you're using. But whatever that is, there are design principles and patterns that you probably should follow. When it comes to OOP, usually just following its main pillars is enough to make pretty good code. So, here's a quick overview of them:

- **encapsulation** - an object should define its state and the methods to operate on it
- **abstraction** - an object should provide a simple interface for using it, hiding the internal details from its user
- **inheritance** - common functionality should be extracted to base classes, with derived classes building on top of that functionality (this one goes hand in hand with the DRY principle)
- **polymorphism** - multiple classes can implement the same interface, allowing others to use the interface without knowing which of the implementations is used

And there's also **separation of concerns** - this isn't one of the pillars of OOP, but it's just as important. Separation of concerns means every unit of code should do only one thing, and each thing should be done by only one unit. And for larger, more complex projects, there's also the **[SOLID principles](https://en.wikipedia.org/wiki/SOLID)**, which I won't discuss here.

## 5. Use version control

Any form of version control, be it a full VCS like Git or Subversion or just a simple changelog, is extremely helpful - not only does it allow you to revert your project to a previous state of things go south, but it also shows you a clear history of what you've done. And when you're coming back to a project, just looking at a commit tree can be enough to help you remember what you were doing. Also, from my experience, if you develop the habit of committing small pieces of code often, even when you're working alone, you'll tend to focus on one feature at a time, instead of making changes all over the place. Not just that, using version control is a great way to keep your code organised and to safely make experiments. Finally, if you consistently use version control, you'll be better off when you have to work with others.

## Conclusion

Returning to a project you've forgotten is never easy, but if you think about maintainability while writing your code, you'll have a much easier time, and you'll end up writing better code - which is always a win. Are there any other tips you have about writing maintainable code? Share them in the comments below! As always, thanks for reading, and goodbye!
