# TravelScheduler api doc

## User
#### POST /api/user/register  

request
```
param: {
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
param: {
    user_id
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
            travel_discription,
            travel_done,
        ]
    }
}
```

#### GET /api/travel/spot

request
```
param: {
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
        travel_discription,
        travel_done,
        days: [
            spots: [
                spot: {
                    spot_id,
                    spot_name,
                    spot_location,
                    spot_rank,
                    spot_openhour,
                    spot_discription,
                    spot_time,
                    spot_transportation,  // "" if terminus
                    spot_tag_id,
                    spot_tag_name,
                    spot_tag_color,
                }
            ]
        ]
    }
}
```

#### POST /api/travel/create

request
```
param: {
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_discription,
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
param: {
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
param: {
    travel_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_discription,
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

## Spot
#### GET /api/spot

request
```
param: {
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
            spot: {
                spot_id,
                spot_name,
                spot_location,
                spot_rank,
                spot_openhour,
                spot_star,
                spot_discription,
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
param: {
    user_id,
    spot_name,
    spot_location,
    spot_rank,
    spot_openhour,
    spot_discription,
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
param: {
    spot_star,
    spot_discription,
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
param: {
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
param: {
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
            group: {
                group_id,
                group_name.
                group_discription,
                group_peoplenum,
                members: [
                    member: {
                        username,
                        email
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
param: {
    group_name,
    group_discription,
    group_peoplenum,    // initially 1
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

#### PUT /api/group/join

request
```
param: {
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

#### PUT /api/group/kick

request
```
param: {
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

#### PUT /api/group/edit

request
```
param: {
    group_id,
    group_name,
    group_discription,
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
param: {
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
