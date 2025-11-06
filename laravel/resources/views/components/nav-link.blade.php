@props(['active'])

@php
$classes = ($active ?? false)
            ? 'btn btn-sm btn-ghost btn-active'
            : 'btn btn-sm btn-ghost';
@endphp

<a {{ $attributes->merge(['class' => $classes . ' font-medium'] ) }}>
    {{ $slot }}
</a>
