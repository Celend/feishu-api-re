# $1: JSON format string, see UpdateUserCustomStatusRequest in im_settings.proto
# Example:
# { 
#    updateStatuses: [{
#         id: '<ID FROM get_custom_status.sh>',
#         fields: [1, 4],
#         title: config.title,
#         effectiveInterval: {
#             startTime: `${Math.floor(config.startTime / 1000)}`,
#             endTime: `${Math.floor(config.endTime / 1000)}`,
#             isShowEndTime: true
#         },
#     }],
# }
echo "$1" \
  | ./encode.js 1103404 UpdateUserCustomStatusRequest \
  | ./call.js \
  | ./decode.js UpdateUserCustomStatusResponse