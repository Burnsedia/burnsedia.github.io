# GA4 Event Taxonomy

## Objective
Track newsletter, supporter, social, and qualified client intent actions with one consistent event contract.

## Event Names

- `newsletter_submit`
- `github_sponsor_click`
- `patreon_click`
- `social_follow_click`
- `work_with_me_click`
- `cta_click` (generic CTA intent)

## Required Parameters

- `source` (page context)
- `placement` (exact module/slot)
- `label` (button/link label key)
- `page_path`
- `page_type`

Optional:

- `social_platform`
- `destination_url`
- `form_id`

## Source Values

- `global_nav`
- `home`
- `blog_index`
- `blog_post`
- `newsletter_page`
- `thank_you_page`
- `footer`
- `socials_page`

## Placement Values

- `header_desktop_newsletter`
- `header_mobile_newsletter`
- `header_desktop_work_with_me`
- `header_mobile_work_with_me`
- `home_hero_work_with_me`
- `home_cta_work_with_me`
- `home_stats_github_sponsor`
- `blog_index_top_newsletter`
- `blog_index_top_work_with_me`
- `blog_featured_work_with_me`
- `blog_index_bottom_work_with_me`
- `blog_index_start_here`
- `blog_index_bottom_newsletter`
- `blog_post_end_newsletter`
- `blog_post_end_work_with_me`
- `newsletter_hero_form`
- `thank_you_service_path`
- `footer_newsletter_module`
- `footer_github_sponsor`
- `footer_patreon`
- `footer_social_follow`
- `footer_work_with_me`
- `socials_follow`
- `socials_support`
- `socials_client`
- `socials_client_newsletter`

## Page Type Values

- `home`
- `blog_index`
- `blog_post`
- `newsletter`
- `thank_you`
- `service`
- `other`

## QA Checklist

1. Open GA4 DebugView.
2. Verify each core event fires once per interaction.
3. Confirm required params are populated.
4. Confirm no duplicate fire on Astro page transitions.
5. Confirm mobile nav and desktop nav emit distinct placements.
