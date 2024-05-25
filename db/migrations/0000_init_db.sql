CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`created_at` text DEFAULT current_timestamp,
	`owner` integer NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `thumbnails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fileId` integer NOT NULL,
	`urlThumb` text NOT NULL,
	FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE INDEX `id_Files_index` ON `files` (`id`);--> statement-breakpoint
CREATE INDEX `id_thumbnails_index` ON `thumbnails` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `id_Users_index` ON `users` (`id`);