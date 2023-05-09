CREATE DATABASE `TravelScheduler`;
USE `TravelScheduler`;
CREATE TABLE `USER` (
	`user_id` varchar(256) not null, 
    `name` varchar(20) default null,
    PRIMARY KEY(`user_id`)
);

CREATE TABLE `GROUP` (
	`group_id` varchar(256) not null,
    `name` varchar(20) default null,
    `discription` varchar(100) default null,
    `people_num` int default null,
    PRIMARY KEY(`group_id`)
);

CREATE TABLE `TRAVEL` (
	`travel_id` varchar(256) not null,
    `group_id` varchar(256) default null,
    `user_id` varchar(256) default null,
    `name` varchar(20) default null,
    `date` date default null,
    `people_num` int default null,
    `discription` varchar(100) default null,
    `done` bool default null,
    PRIMARY KEY(`travel_id`),
    FOREIGN KEY (`group_id`) REFERENCES `GROUP` (`group_id`)ON DELETE SET NULL,
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE SET NULL
);

CREATE TABLE `TAG` (
	`tag_id` varchar(256) not null,
    `name` varchar(20) default null,
    `color` varchar(20) default null,
    PRIMARY KEY(`tag_id`)
);

CREATE TABLE `SPOT` (
	`spot_id` varchar(256) not null,
    `tag_id` varchar(256) default null,
    `arrive_id` varchar(256) default null,
    `name` varchar(20) default null,
    `location` varchar(100) default null,
    `ranking` float default null,
    `open_hour` time default null,
    `discription` varchar(100) default null,
    `transportation` varchar(20) default null,
    `start_time` time default null,
    `arrive_time` time default null,
    PRIMARY KEY(`spot_id`),
    FOREIGN KEY (`tag_id`) REFERENCES `TAG` (`tag_id`)ON DELETE SET NULL,
    FOREIGN KEY (`arrive_id`) REFERENCES `SPOT` (`spot_id`) ON DELETE SET NULL
);


CREATE TABLE `CONTAIN` (
	`user_id` varchar(256) not null,
    `group_id` varchar(256) not null,
	PRIMARY KEY (`user_id`,`group_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)ON DELETE CASCADE,
    FOREIGN KEY (`group_id`) REFERENCES `GROUP` (`group_id`) ON DELETE CASCADE
);

CREATE TABLE `STAR` (
	`user_id` varchar(256) not null,
    `spot_id` varchar(256) not null,
	PRIMARY KEY (`user_id`,`spot_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)ON DELETE CASCADE,
    FOREIGN KEY (`spot_id`) REFERENCES `SPOT` (`spot_id`) ON DELETE CASCADE
);

CREATE TABLE `HAS` (
	`travel_id` varchar(256) not null,
    `spot_id` varchar(256) not null,
	PRIMARY KEY (`travel_id`,`spot_id`),
    FOREIGN KEY (`travel_id`) REFERENCES `TRAVEL` (`travel_id`)ON DELETE CASCADE,
    FOREIGN KEY (`spot_id`) REFERENCES `SPOT` (`spot_id`) ON DELETE CASCADE
);




