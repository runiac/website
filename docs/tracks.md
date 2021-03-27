---
title: Tracks
slug: /tracks
---

1. All _Tracks_ beside the [pre-track](#pre-track) will be executed in parallel

- By definition **tracks do not have dependencies on each other**. If they do, treat them as one track with multiple steps

2. For a track to be executed, at least one _Step_ has to be defined within it

#### Default Track

For projects that are relatively straightforward and don't require multiple tracks, you do not need to use tracks in your folder heiarachy.
The benefit of this approach is a simpler directory hierarchy, and you still have the possibility to scale out with
multiple tracks down the road.

Be aware that with this simpler approach, you cannot use pre-tracks (see below).

A sample structure from the root directory of your project might look like this:

```bash
step1_sample/
step1_another_one/
runiac.yml
```
