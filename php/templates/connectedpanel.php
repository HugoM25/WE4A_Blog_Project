<?php

function generate_connexion_panel($user_infos) {
return <<<HTML
            <div class="icon-user">
                <img src="{$user_infos['profile_picture_path']}" alt="user avatar">
            </div>
            <div class="info-user">
                <span class="connected-username" >{$user_infos['name']}</span>
                <span class="connected-user-ref">{$user_infos['ref']}</span>
            </div>
            <div class="action-user">
                <button class="action-button">
                    <img src="images/icons/logout_icon.svg" class="icon-logout">
                </button>
                <button class="action-button">
                    <img src="images/icons/settings_icon.svg" class="icon-settings">
                </button>
            </div>
HTML;
}
?>