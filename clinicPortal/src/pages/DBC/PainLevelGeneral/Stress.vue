<template>
    <div>
        <b-row>
            <b-col xl="12">
                The far left represents "No Stress", while the 
                far right represents "The worst possible Stress"
                <br><br>
                <b-form-group
                    label="Stress Level (6 Weeks)" 
                    label-for="Stress Level"
                    breakpoint="md"
                    >
                        <b-row>
                            <b-col md="12">
                                <div class="mb-sm">
                                    <b-form-slider
                                        :id="$route.name+'stressLevel'"
                                        :value='0'
                                        :max='10'
                                    />
                                </div>
                            </b-col>
                        </b-row>
                </b-form-group>  
                <b-form-group >
                    <label :for="$route.name+'painBetter'">What makes your pain better?</label>
                    <textarea-autosize 
                    placeholder="Write here"
                    :min-height="35"
                    class="form-control"
                    :id="$route.name+'painBetter'"
                    />
                    
                </b-form-group>
                <b-form-group >
                    <label :for="$route.name+'painWorse'">What makes your pain worse?</label>
                    <textarea-autosize 
                    placeholder="Write here"
                    :min-height="35"
                    class="form-control"
                    :id="$route.name+'painWorse'"
                    />
                    
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>