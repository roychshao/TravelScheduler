# TravelScheduler api doc

## User
#### GET /api/user
request
```
session: {
    user_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        user_id,
        username,
        email,
        photoURL,
    }
}
```
#### POST /api/user/register  

request
```
body: {
    username,
    email
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        user_id,
    }
}
```

## Travel
#### GET /api/travel

request
```
session: {
    user_id,
}
```

response
```
body: {
    success: true,
    message: ""
    data: {
        travels: [
            travel_id,
            travel_name,
            travel_date,
            travel_peoplenum,
            travel_description,
            travel_done,
            group_id,
        ]
    }
}
```

#### GET /api/travel/spot

request
```
body: {
    travel_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        travel_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_description,
        travel_done,
        group_id,
        days: [
            {
                spots: [
                    {
                        spot_id,
                        spot_name,
                        spot_location,
                        spot_rank,
                        spot_openhour,
                        spot_description,
                        spot_arrive_time,
                        spot_start_time,
                        spot_transportation,  // "" if terminus
                        spot_tag_id,
                        spot_tag_name,
                        spot_tag_color,
                    }
                ]
            }
        ]
    }
}
```

#### POST /api/travel/create

request
```
session: {
    user_id,
}

body: {
    travel_name,
    group_id,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/travel/delete

request
```
body: {
    travel_id
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/travel/edit

request
```
body: {
    travel_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
    group_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Spot
#### GET /api/spot

request
```
session: {
    user_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        spots: [
            {
                spot_id,
                spot_name,
                spot_location,
                spot_rank,
                spot_openhour,
                spot_star,
                spot_description,
                spot_tag_id,
                spot_tag_name,
                spot_tag_color,
            }
        ]
    }
}
```

#### POST /api/spot/create

request
```
session: {
    user_id,
}

body: {
    spot_name,
    spot_location,
    spot_rank,
    spot_openhour,
    spot_description,
    spot_tag_id,
    spot_tag_name,
    spot_tag_color,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/spot/edit

request
```
body: {
    spot_star,
    spot_description,
    spot_tag_name,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/spot/delete

request
```
body: {
    spot_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Group
#### GET /api/group/

request
```
session: {
    user_id
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        groups: [
            {
                group_id,
                group_name.
                group_description,
                group_peoplenum,
                group_creator_id,
                group_creator_name,
                members: [
                    {
                        user_id,
                        username,
                    }
                ]
            }
        ]
    }
}
```

#### POST /api/group/create

request
```
body: {
    group_name,
    group_description,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        group_id,
    }
}
```

#### POST /api/group/join

request
```
body: {
    group_id,
    user_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/group/kick

request
```
body: {
    user_id,
    group_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/group/edit

request
```
body: {
    group_id,
    group_name,
    group_description,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/group/delete

request
```
body: {
    group_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Error return

response
```
body: {
    success: false,
    message: "",
    data: {}
}
```
