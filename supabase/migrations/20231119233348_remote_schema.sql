alter table "Foo"."Bar" drop constraint "Bar_pkey";

drop index if exists "Foo"."Bar_pkey";

drop table "Foo"."Bar";


