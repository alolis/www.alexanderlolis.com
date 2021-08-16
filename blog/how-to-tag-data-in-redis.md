---
slug: how-to-tag-data-in-redis
title: How to tag data in Redis
date: 2020-12-01
description: What are Sets and how to use them as secondary indexes
author: Alexander Lolis
author_url: https://github.com/alolis
author_image_url: https://avatars.githubusercontent.com/u/82233?v=4
tags: [playground, howto, redis]
---

[Redis](https://redis.io/) is a wonderful piece of technology. An in-memory, super-fast key-value database, which if you do not already know that it exists, you have been living under a rock.

The cool thing about Redis, is that it supports more data types than simply storing string key-value pairs, and that’s when the fun begins. One of those data types, which will help us with our tagging exercise, is Sets.

<!--truncate-->

### Redis Sets

Let’s assume that you have an app and you want to show a list of book titles and their associated tags. The first step is to add those articles in Redis, along with their tags. Let’s add a few via `redis-cli`:

```bash
127.0.0.1:6379[1]> SADD "The Advantage: Why Organizational Health Trumps Everything Else in Business" business leadership nonfiction patrick_lencioni
(integer) 4

127.0.0.1:6379> SADD "Conscious Business: How to Build Value Through Values" business nonfiction fred_kofman
(integer) 3

127.0.0.1:6379> SADD "Code Complete" programming computer_science reference steve_mcconnell
(integer) 4
```

The above commands will create three different `Sets`. Each of them will use the title of the book as a key and the rest of the values after the title will be added as members within each Set.

You can check the members of the `Set` by issuing an `SMEMBERS` command, like so:

```bash
127.0.0.1:6379[1]> SMEMBERS "The Advantage: Why Organizational Health Trumps Everything Else in Business"
1) "business"
2) "leadership"
3) "nonfiction"
4) "patrick_lencioni"
```

The special thing about `Sets` is that if you try to add an element that already exists, the element will simply be ignored. This ensures that every member within that Set, is unique.

For example, let’s say you want to add the tag `must_read` to a `Set`, and then you try to re-add it:

```bash
127.0.0.1:6379[1]> SADD "The Advantage: Why Organizational Health Trumps Everything Else in Business" must_read
(integer) 1

127.0.0.1:6379[1]> SADD "The Advantage: Why Organizational Health Trumps Everything Else in Business" must_read
(integer) 0

127.0.0.1:6379[1]> SMEMBERS "The Advantage: Why Organizational Health Trumps Everything Else in Business"
1) "business"
2) "must_read"
3) "leadership"
4) "nonfiction"
5) "patrick_lencioni"
```

As you can see in the example above, even though I tried to add it twice, there is only one copy of the `must_read` tag within the `Set`, which definitely makes our next step easier.

### Using Sets as secondary indexes

Storing plain `Sets` is not that useful by itself. Most of the time, we will need to access the data in different ways in order to show a useful representation of said data. By denormalizing and/or duplicating the data we are able to achieve just that. This common pattern, called "secondary index", in our case is basically a Set with the original data, but inverted.

For example, let’s say that you want to be able to find all the book titles with the tag *business*. What you need to do here is to create a `Set` whose key will be `tag:business` and its members are going to be the titles of the books which are associated with this tag:

```bash
127.0.0.1:6379> SADD tag:business "The Advantage: Why Organizational Health Trumps Everything Else in Business" "Conscious Business: How to Build Value Through Values"
(integer) 2

127.0.0.1:6379> SADD tag:programming "Code Complete"
(integer) 1
```

Now every time you need to find all books with the *business* tag, all you have to do is to use the `SMEMBERS` command on the `tag:business` key, and then use those members (which are basically keys that represent other `Sets`, book titles in our case) to get the complete list of their tags:

```bash
127.0.0.1:6379> SMEMBERS tag:business
1) "Conscious Business: How to Build Value Through Values"
2) "The Advantage: Why Organizational Health Trumps Everything Else in Business"

127.0.0.1:6379> SMEMBERS "Conscious Business: How to Build Value Through Values"
1) "business"
2) "fred_kofman"
3) "nonfiction"

127.0.0.1:6379> SMEMBERS "The Advantage: Why Organizational Health Trumps Everything Else in Business"
1) "business"
2) "patrick lencioni"
3) "nonfiction"
4) "leadership"
5) "must_read"
```

Of course, the above is just a basic idea of what you can do with a secondary index. Properly creating and maintaining those secondary indexes is definitely something you need to carefully consider in your application logic since Redis will not handle it for you.

Another thing that you need to consider is atomicity. If multiple processes want to update your secondary indexes but also use any intermediate values from Redis in order to calculate the new data for the update, then the only way to achieve this is with [Lua scripting](https://redis.io/commands/eval) or else you will probably end up with inconsistencies. More on that in a different post!

Finally, keep in mind here that if you have A LOT of members in the `Set`, that might slow things down and you will need to use `SCAN` (or another closely related command) instead.

### Other cool things with Sets

Finding common tags between book titles:

```bash
127.0.0.1:6379> SINTER "The Advantage: Why Organizational Health Trumps Everything Else in Business" "Conscious Business: How to Build Value Through Values"
1) "business"
2) "nonfiction"
```

Finding ALL unique tags between book titles:

```bash
127.0.0.1:6379> SUNION "The Advantage: Why Organizational Health Trumps Everything Else in Business" "Conscious Business: How to Build Value Through Values"
1) "leadership"
2) "business"
3) "fred_kofman"
4) "must_read"
5) "nonfiction"
6) "patrick lencioni"
```

Finding a random book title with a specific tag:

```bash
127.0.0.1:6379> SRANDMEMBER tag:business
"Conscious Business: How to Build Value Through Values"
```

### Conclusion

Sets are definitely a powerful and helpful data structure in Redis which can be the building block for many more things. With the use of secondary indexes, we can build and execute [even more complex](https://redis.io/topics/indexes) queries on our data and then load them in a very very fast manner. As we will be digging deeper, and by elevating the capabilities of Redis, we can build a very fast and efficient caching mechanism, even for the most demanding apps.